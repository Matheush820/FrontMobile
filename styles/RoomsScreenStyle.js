import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BA7', // Azul normal de fundo
  },
  searchBar: {
    backgroundColor: '#FFFFFF',  // Barra de pesquisa branca
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    elevation: 3, // Adicionando leve sombra para destaque
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 20,
    color: '#fff',  // Melhor contraste
  },
  labList: {
    marginTop: 20,
    marginBottom: 80,  // Mais espaço para a navegação
  },
  labCard: {
    backgroundColor: '#FFFFFF',  // Cartões brancos
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    elevation: 4,  // Melhor destaque
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  labImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BA7',
  },
  labInfo: {
    marginLeft: 15,
    flex: 1,
  },
  labName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BA7', // Nome dentro dos cartões em azul
    marginBottom: 5,
  },
  labLocation: {
    fontSize: 14,
    color: '#007BA7', // Localização também azul
    marginBottom: 5,
  },
  labDescription: {
    fontSize: 12,
    color: '#007BA7', // Descrição azul
    opacity: 0.9,
  },
  navBar: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#fff',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#ddd',
},
});

export default styles;
