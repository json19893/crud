package tecnm.game.com.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseGenerica {
	private Integer cod;
	private String sms;
	 public ResponseGenerica(String sms,Integer cod) {
	        this.sms = sms;
	        this.cod = cod;
	    }
	

}
