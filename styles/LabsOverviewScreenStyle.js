import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0093B6', // Fundo azul vibrante
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    // Elevação para Android
    elevation: 6,

    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryIcon: {
    marginBottom: 15,
  },

  categoryText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',  // Mudei para branco para melhor contraste
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // Navbar Top (barra superior com seta)
  navbarTop: {
    height: 60,
    backgroundColor: '#0093B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  navbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Navbar Inferior (barra de navegação)
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
