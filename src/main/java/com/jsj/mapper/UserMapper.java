package com.jsj.mapper;

import com.jsj.bean.User;

import java.util.List;


public interface UserMapper {

    List<User> getUser(User user);
}
