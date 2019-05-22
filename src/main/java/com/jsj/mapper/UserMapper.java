package com.jsj.mapper;

import com.jsj.bean.User;

import java.util.List;

public interface UserMapper {

    List<User> getUser(User user);

    int insertUser(User user);

    int deleteUser(Integer id);

    int updateUser(User user);
}
