package tecnm.game.com.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tecnm.game.com.config.Constantes;
import tecnm.game.com.dto.GameDto;
import tecnm.game.com.dto.ResponseGenerica;
import tecnm.game.com.entidades.GameEntity;
import tecnm.game.com.repositorio.GameRepositorio;
import tecnm.game.com.service.GameService;

@Service
public class GameServiceImpl extends Constantes implements GameService {

	@Autowired
	GameRepositorio gameRepository;
	@Autowired
	ModelMapper modelMapper;

	@Override
	public List<GameDto> getAllGame() {
		List<GameEntity> res = gameRepository.findAll();
		List<GameDto> responseList = res.stream().map(GameDto -> modelMapper.map(GameDto, GameDto.class))
				.collect(Collectors.toList());
		return responseList;
	}

	@Override
	public ResponseGenerica putGame(GameDto request) {
		try {
			Integer count = gameRepository.countByNombre(request.getNombre());
			if (count > 0)
				return new ResponseGenerica(GUARDADO_REPETIDO, 1);

			GameEntity entidad = modelMapper.map(request, GameEntity.class);
			gameRepository.save(entidad);
		} catch (Exception e) {
			return new ResponseGenerica(GUARDADO_ERROR, 1);
		}

		return new ResponseGenerica(GUARDADO_EXITOSO, 0);
	}

	@Override
	public ResponseGenerica deleteGame(Integer id) {
		try {

			gameRepository.deleteById(id);

		} catch (Exception e) {
			return new ResponseGenerica(BORRADO_ERROR, 1);
		}

		return new ResponseGenerica(BORRADO_EXITO, 0);
	}

	@Override
	public ResponseGenerica updateGame(GameDto request) {
		try {

			Optional<GameEntity> data = gameRepository.findById(request.getId());
			if (data.isEmpty())
				return new ResponseGenerica(NO_DATA, 1);

			GameEntity entidad = data.get();

			entidad = modelMapper.map(request, GameEntity.class);
			gameRepository.save(entidad);

		} catch (Exception e) {
			return new ResponseGenerica(ACTUALIZA_ERROR, 1);
		}
		return new ResponseGenerica(ACTUALIZA_EXITO, 0);
	}

	@Override
	public GameDto getByidGame(Integer id) {
	
	
		Optional<GameEntity> data = gameRepository.findById(id);
		GameEntity entidad = data.get();

		GameDto dto = modelMapper.map(entidad, GameDto.class);
return dto;
	}

}
