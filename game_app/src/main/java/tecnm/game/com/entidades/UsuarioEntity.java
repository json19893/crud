package tecnm.game.com.entidades;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class UsuarioEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private Integer id;
	@Column(name="usuario")
	private String usuario;
	@Column(name="password")
	private String password;
	@Column(name="nombre_completo")
	private String nombreCompleto;
	@Column(name="fecha_conexion")
	private Date fechaConexion;
	@Column(name="sesion_activa")
	private Integer sesionActiva;
	

}
