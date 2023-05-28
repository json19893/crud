package tecnm.game.com.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tecnm.game.com.entidades.GameEntity;

@Repository
public interface GameRepositorio extends JpaRepository<GameEntity, Integer> {

	Integer countByNombre(String nombre);

}
