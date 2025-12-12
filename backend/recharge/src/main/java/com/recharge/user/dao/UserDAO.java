package com.recharge.user.dao;

import com.recharge.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDAO {
    int insertUser(UserVO user);

    int checkUserId(String userId);

    int checkUserNickName(String userNickname);

    UserVO getUserById(String userId);

    int updateDeviceInfo(UserVO user);

    String findUserId(UserVO user);

    UserVO findUserForPasswordReset(UserVO user);

    int updateResetToken (UserVO user);

    UserVO getUserByResetToken (String resetToken);

    int updateUserPassword (UserVO user);

    int checkUserEmail(String userEmail);

    int updateEmailAuthCode(UserVO user);

    UserVO getUserByEmailAuthCode(UserVO user);

    int verifyUserEmail(UserVO user);

    int updateUserAfterEmailVerified(UserVO user);

    int updateUserInfo(UserVO user);

    int updateProfileUserPassword(UserVO user);
}