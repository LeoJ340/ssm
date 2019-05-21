package com.jsj.service;

import com.jsj.bean.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getUser(User user);

}
