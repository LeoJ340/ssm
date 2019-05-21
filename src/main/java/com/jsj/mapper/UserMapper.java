package com.jsj.mapper;

import com.jsj.bean.User;

import java.util.List;


public interface UserMapper {

    List<User> getUser(User user);

    void insertUser(User user);

    void deleteUser(Integer id);
}
