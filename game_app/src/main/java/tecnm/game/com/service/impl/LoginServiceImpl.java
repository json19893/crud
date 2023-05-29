package tecnm.game.com.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tecnm.game.com.config.Constantes;
import tecnm.game.com.dto.LoginRequest;
import tecnm.game.com.dto.LoginResponse;
import tecnm.game.com.dto.ResponseGenerica;
import tecnm.game.com.entidades.UsuarioEntity;
import tecnm.game.com.repositorio.LoginRepository;
import tecnm.game.com.service.LoginService;

@Service
public class LoginServiceImpl extends Constantes implements LoginService {
    @Autowired
    LoginRepository loginRepository;

    @Override
    public LoginResponse login(LoginRequest request) {
        LoginResponse response = new LoginResponse();
        response.setCod(0);
        response.setSms(LOGIN_EXITO);
        try {
            UsuarioEntity entidad = loginRepository.findByUsuarioAndPassword(request.getUsuario(),
                    request.getPassword());

            if (entidad == null) {
                response.setCod(1);
                response.setSms(LOGIN_NO_DATA);
                return response;
            }
            if (entidad.getSesionActiva() == 1) {
                response.setCod(1);
                response.setSms(LOGIN_SESSION_ACTIVA);
                return response;
            }

            Date fechaActual = new Date();
            entidad.setFechaConexion(fechaActual);
            entidad.setSesionActiva(1);
            loginRepository.save(entidad);
            response.setFechaConexion(fechaActual);
            response.setSesion(1);
            response.setNombreCompleto(entidad.getNombreCompleto());
            response.setUsuario(entidad.getUsuario());
        } catch (Exception e) {
            response.setCod(1);
            response.setSms(LOGIN_ERROR + e);
            return response;
        }
        return response;
    }

    @Override
    public ResponseGenerica logout(String usuario) {
        try {
            UsuarioEntity entidad = loginRepository.findByUsuario(usuario);
            if (entidad == null)
                return new ResponseGenerica(LOGOUT_NO_DATA, 1);

            entidad.setFechaConexion(null);
            entidad.setSesionActiva(0);
            loginRepository.save(entidad);
        } catch (Exception e) {
            return new ResponseGenerica(LOGOUT_ERROR, 1);
        }
        return new ResponseGenerica(LOGOUT_EXITO, 0);
    }

}
