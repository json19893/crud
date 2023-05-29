package tecnm.game.com.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse extends ResponseGenerica {
    private String usuario;
    private String nombreCompleto;
    private Date fechaConexion;
    private Integer sesion;

    public LoginResponse(String usuario,String nombreCompleto,Date fechaConexion,Integer sesion) {
        this.usuario = usuario;
        this.nombreCompleto = nombreCompleto;
        this.fechaConexion = fechaConexion;
        this.sesion = sesion;
    }


}
