package com.purrchaser.purrchaserbackend.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3;

    public void putObject(String bucketName, String key, byte[] file, String contentType) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType) // Set the content type
                .build();

        s3.putObject(putObjectRequest, RequestBody.fromBytes(file));
    }

    public byte[] getObject(String bucketName, String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        ResponseInputStream<GetObjectResponse> res = s3.getObject(getObjectRequest);

        try {
            return res.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // New method to generate S3 URL
    public String generateS3Url(String bucketName, String key) {
        return s3.utilities().getUrl(builder -> builder.bucket(bucketName).key(key)).toExternalForm();
    }

}
