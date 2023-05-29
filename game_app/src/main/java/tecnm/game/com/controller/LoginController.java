package tecnm.game.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tecnm.game.com.dto.LoginRequest;
import tecnm.game.com.dto.LoginResponse;
import tecnm.game.com.dto.ResponseGenerica;
import tecnm.game.com.service.LoginService;

@RequestMapping(value = "/seguridad")
@CrossOrigin
@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
	public LoginResponse  login(@RequestBody LoginRequest request ) {
		return loginService.login(request);
	}

    @GetMapping("/logout/{usuario}")
	public ResponseGenerica  logout(@PathVariable String  usuario ) {
		return loginService.logout(usuario);
	}
}
