package tecnm.game.com.service;

import tecnm.game.com.dto.LoginRequest;
import tecnm.game.com.dto.LoginResponse;
import tecnm.game.com.dto.ResponseGenerica;

public interface LoginService {

    LoginResponse login(LoginRequest request);

    ResponseGenerica logout(String usuario);
    
}
