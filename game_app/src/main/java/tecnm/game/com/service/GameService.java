package tecnm.game.com.service;

import java.util.List;

import tecnm.game.com.dto.GameDto;
import tecnm.game.com.dto.ResponseGenerica;

public interface GameService {

	List<GameDto> getAllGame();

	ResponseGenerica putGame(GameDto request);

	ResponseGenerica deleteGame(Integer id);

	ResponseGenerica updateGame(GameDto request);

    GameDto getByidGame(Integer id);

}
