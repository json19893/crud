package tecnm.game.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tecnm.game.com.dto.GameDto;
import tecnm.game.com.dto.ResponseGenerica;
import tecnm.game.com.service.GameService;

@RestController
@RequestMapping(value = "/game")
@CrossOrigin
public class GameController {
	@Autowired
	GameService gameService;
	
	@GetMapping("/getAllGame")
	public List<GameDto>  getAllGame() {
		return gameService.getAllGame();
	} 
	@PostMapping("/putGame")
	public ResponseGenerica  putGame(@RequestBody GameDto request ) {
		return gameService.putGame(request);
	}

	@DeleteMapping("/deleteGame/{id}")
	public ResponseGenerica  deleteGame(@PathVariable Integer id ) {
		return gameService.deleteGame(id);
	}
	
	@PostMapping("/updateGame")
	public ResponseGenerica  updateGame(@RequestBody GameDto request ) {
		return gameService.updateGame(request);
	}
	@GetMapping("/getByidGame/{id}")
	public GameDto  getByidGame(@PathVariable Integer id ) {
		return gameService.getByidGame(id);
	}


}
