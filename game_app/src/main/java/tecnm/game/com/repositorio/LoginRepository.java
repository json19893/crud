package tecnm.game.com.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import tecnm.game.com.entidades.UsuarioEntity;

public interface LoginRepository  extends JpaRepository<UsuarioEntity, Integer> {
    UsuarioEntity findByUsuarioAndPassword(String usuario,String password);
    UsuarioEntity findByUsuario(String usuario);

    
}
