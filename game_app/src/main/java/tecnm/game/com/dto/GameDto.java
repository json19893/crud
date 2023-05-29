package tecnm.game.com.dto;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GameDto {
	private Integer id;
	private String nombre;
	private String descripcion;
	private String fechaCreacion;
	private String fechaRegistro;
}
