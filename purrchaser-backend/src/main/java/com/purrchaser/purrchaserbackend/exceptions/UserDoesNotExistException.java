package com.purrchaser.purrchaserbackend.exceptions;

public class UserDoesNotExistException extends RuntimeException {

    public UserDoesNotExistException() {
        super("The user you are looking for does not exist");
    }
}
