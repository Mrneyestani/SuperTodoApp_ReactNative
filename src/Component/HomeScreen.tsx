import { useEffect } from 'react'
import { faBars, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useStore } from '@nanostores/react'
import { FlatList } from 'react-native'
import { Link } from 'react-router-native'
import { HomeScreenStore, initHomeScreen } from '../Store/HomeScreen.Store'
import { initNewListStore } from '../Store/NewListScreen.Store'
import { initTodoListStore } from '../Store/TodoListScreen.Store'
import {
  ButtonContainer,
  CardTitle,
  ListCardContainer,
  MainTitle,
} from '../Style/HomeScreen.Style'
import {
  BottomNav,
  BottomNavContainer,
  BottomNavIcon,
  ContentContainer,
  UserBanner,
  UserBannerContainer,
  UserIcon,
  UserLabel,
  UserLabelContainer,
  UserUsername,
} from '../Style/TodoListScreen.Style'
import { LoginScreenStore } from '../Store/LoginScreen.Store'
import { User } from '../Type/LoginScreen.Type'

/**
 * @module HomeScreen
 * @description
 *  Contient l'écran de la page d'accueil de l'application
 */

/**
 * Voici la composant affichant la page d'accueil de l'application
 * todo.
 */
export default function HomeScreen() {
  // On récupére l'état de l'ecran d'accueil
  const { lists } = useStore(HomeScreenStore)
  // On récupére l'utilisateur connécté
  const { user } = useStore(LoginScreenStore)

  // Création d'un effet qui initialise le store de la page
  // d'accueil
  useEffect(() => {
    initHomeScreen(user as User)
  }, [])

  return (
    <>
      {/* Le contenue principal */}
      <ContentContainer header={true}>
        <MainTitle>Mes listes</MainTitle>

        {/* La liste des listes de chose à faire */}
        <FlatList
          data={lists}
          keyExtractor={list => list.id}
          renderItem={({ item: list }) => (
            <ListCardContainer
              to={`/todos`}
              onPress={() => initTodoListStore(list)}
            >
              <>
                <UserBannerContainer>
                  <UserBanner>
                    <UserIcon icon={faUser} size={35}></UserIcon>
                    <UserLabelContainer>
                      <UserLabel>Par</UserLabel>
                      <UserUsername>
                        {user?.username || 'Inconnue'}
                      </UserUsername>
                    </UserLabelContainer>
                  </UserBanner>
                </UserBannerContainer>

                <CardTitle>{list.label}</CardTitle>
              </>
            </ListCardContainer>
          )}
        ></FlatList>

        {/* Le bouton */}
      </ContentContainer>

      {/* La barre de navigation du bas */}
      <BottomNavContainer>
        <ButtonContainer to="/new" onPress={() => initNewListStore()}>
          <BottomNavIcon icon={faCirclePlus} size={40}></BottomNavIcon>
        </ButtonContainer>
        <BottomNav>
          <Link to="/menu">
            <BottomNavIcon icon={faBars} size={40}></BottomNavIcon>
          </Link>
        </BottomNav>
      </BottomNavContainer>
    </>
  )
}
