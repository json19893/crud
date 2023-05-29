package tecnm.game.com.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {

    private String usuario;
    private String password;
    
    
}
