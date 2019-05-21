package com.jsj.controller;

import com.jsj.bean.User;
import com.jsj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping("userList.do")
    public List<User> get(User user){
        return service.getUser(user);
    }

}
