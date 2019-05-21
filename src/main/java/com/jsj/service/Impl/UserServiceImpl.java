package com.jsj.service.Impl;

import com.jsj.mapper.UserMapper;
import com.jsj.bean.User;
import com.jsj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper dao;

    public List<User> getUser(User user){
        return dao.getUser(user);
    }

}
