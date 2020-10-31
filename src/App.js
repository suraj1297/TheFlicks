import React, { Component, createContext } from 'react'
import Slider from './components/Slider/Slider'
import Navbar from "./components/Navbar/Navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Movies from './components/Movies/Movies'
import Trailer from './components/Trailer/Trailer'
import SignIn from './components/SignUpIn/SignIn'
import SignUp from './components/SignUpIn/SignUp'
import Wishlist from './components/Wishlist/Wishlist'

export const TrailerContext = createContext()
export const WishListContext = createContext()

export default class App extends Component {

  constructor() {

    super()
    this.state = {
      isLoggedIn: false,
      language: "en",
      userName: "",
      media: "",
      signin: false,
      signup: false,
      wishlist: [],
      wishlistMessage: false
    }
  }

  changeLanguage = (e) => {
    this.setState({ language: e.target.value })
  }

  changeMedia = (newMedia) => {
    this.setState({ media: newMedia })
  }

  backToHome = () => {
    this.setState({ media: "" })
  }

  trailer = async (media) => {
    let name = media.title ? media.title : media.name
    await new Promise(resolve => resolve()).then(() => {
      localStorage.setItem("trailer", JSON.stringify(media))
    })

    window.open(`/details/${name.replace(" ", "-")}`)

  }

  askSignInUp = (option, user = null, wishlist = []) => {
    let [op1, op2] = option === "signin" ? ["signin", "signup"] : ["signup", "signin"]

    if (user) {
      this.setState(prevState => {
        return {
          [op1]: !prevState[op1],
          [op2]: false,
          userName: user,
          isLoggedIn: true,
          wishlist: wishlist
        }
      })
    }
    else {
      this.setState(prevState => {
        return {
          [op1]: !prevState[op1],
          [op2]: false
        }
      })
    }
  }

  logOut = () => {
    this.setState({ userName: "", isLoggedIn: false })
    localStorage.setItem("loggedIn", JSON.stringify({ isLoggedIn: false, username: "" }))

  }

  addToWishlist = (item) => {
    this.setState(prevState => {
      if (prevState.wishlist.length > 0)
        return {
          wishlist: [...prevState.wishlist, item],
          wishlistMessage: true
        }
      else {
        return {
          wishlist: [item],
          wishlistMessage: true
        }
      }
    })

    const userData = JSON.parse(localStorage.getItem(this.state.userName))
    localStorage.setItem(this.state.userName,
      JSON.stringify({ password: userData.password, wishlist: this.state.wishlist }))

    let count = 0
    let id = setInterval(() => {
      if (count === 2) {
        this.setState({ wishlistMessage: false })
        clearInterval(id)
      }
      count += 1
    }, 1000)
  }

  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("loggedIn"))
    if (userData && userData.isLoggedIn) {
      let wishlist = JSON.parse(localStorage.getItem(userData.username)).wishlist
      this.setState({ userName: userData.username, isLoggedIn: true, wishlist: wishlist })
    }
  }


  render() {

    return (
      <React.Fragment>
        <Router>
          <Navbar
            isloggedIn={this.state.isLoggedIn}
            changeLanguage={this.changeLanguage}
            language={this.state.language}
            userName={this.state.userName}
            media={this.state.media}
            askSignInUp={this.askSignInUp}
            logOut={this.logOut}
          />

          {this.state.wishlistMessage && <div className="register">Added to Wishlist!</div>}

          <TrailerContext.Provider value={this.trailer}>
            <WishListContext.Provider value={this.addToWishlist}>

              <Switch>
                <Route exact path="/">
                  <Slider media={"Trending"} language={this.state.language}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />

                  <Slider media={"Movies"} language={this.state.language}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />

                  <Slider media={"TV Shows"} language={this.state.language}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />
                </Route>

                <Route path="/trending">
                  <Movies language={this.state.language} media={"trending"}
                    changeMedia={this.changeMedia} backToHome={this.backToHome}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />
                </Route>

                <Route path="/movies">
                  <Movies language={this.state.language} media={"movie"}
                    changeMedia={this.changeMedia} backToHome={this.backToHome}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />
                </Route>

                <Route path="/tvshows">
                  <Movies language={this.state.language} media={"tv"}
                    changeMedia={this.changeMedia} backToHome={this.backToHome}
                    askSignIn={this.askSignInUp} isLoggedIn={this.state.isLoggedIn} />
                </Route>

                <Route path="/details/*">
                  <Trailer {...this.state.trailer} />
                </Route>

                <Route path="/wishlist">
                  <Wishlist wishlist={this.state.wishlist} changeMedia={this.changeMedia}
                    backToHome={this.backToHome} isLoggedIn={this.state.isLoggedIn} />
                </Route>
              </Switch>
            </WishListContext.Provider>
          </TrailerContext.Provider>
          {this.state.signin && <SignIn askSignInUp={this.askSignInUp} />}
          {this.state.signup && <SignUp askSignInUp={this.askSignInUp} />}

        </Router>

      </React.Fragment>
    )
  }
}

