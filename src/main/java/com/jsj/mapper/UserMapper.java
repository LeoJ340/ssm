package com.jsj.mapper;

import com.jsj.bean.User;

import java.util.List;
import java.util.Map;

public interface UserMapper {

//    List<User> getUser(User user);

    // 分页查询
    List<User> getUsersByPage(Map<String,Object> paramsMap);

    // 查询数据总数
    int getUserTotalCount();

    int insertUser(User user);

    int deleteUser(Integer id);

    int updateUser(User user);
}
