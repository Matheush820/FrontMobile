import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#068FB8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Adicionado para Android
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryCard: {
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    // Removi backgroundColor branco fixo para que possa ser dinâmico e texto visível
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // para sombra Android
  },
  categoryText: {
    color: '#FFFFFF', // ok se o fundo for colorido
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 5,
    color: '#fff', // garanta que o ícone fique branco
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    marginBottom: 5,
    color: '#FFFFFF',
  },
  labCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  labImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 15,
  },
  labInfo: {
    flex: 1,
  },
  labName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C4C77',
    marginBottom: 4,
  },
  labLocation: {
    color: '#555',
    fontSize: 14,
  },
 navBar: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#fff',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#ddd',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  zIndex: 1000,
},

  searchResults: {
    maxHeight: 200,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 6,
    padding: 8,
    position: 'absolute', // para garantir sobreposição
    top: 60, // ajustar conforme seu layout
    left: 16,
    right: 16,
    zIndex: 999,
  },
  searchResultsContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 4,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
    position: 'relative',
    zIndex: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultText: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default styles;
