# GITHUB NOTETAKER
------------------

Simple react native application bootstrapped using the react-cli. This app has been built using the following implementation details specified.

#### Stack Navigator
Use of StackNavigator to be able to navigate from one screen to another. This allows you to define the different screens that your app will contain. Those screens are created as React Components, like, Main, Dashboard, Profile, etc. As well as defining the screen (or routes) in your App.js file, it allows you to set some configuration settings, for example, the initial screen that will be render when the application starts, the title at the top of the application, styles, etc. Here it is an example of the StackNavigator definition:

```javascript
const Navigator = StackNavigator({
  Home: { screen: App },
  Main: { screen: Main },
  Dashboard: { screen: Dashboard },
  Profile: { screen: Profile }
}, {
  initialRouteName: 'Main',
  navigationOptions: {
      title: 'Github Notetaker',
      headerTitleStyle: {alignSelf: 'center'}
    }
});
```

To be able to navigate from one screen to another (between components in the end) you get the navigate object with the following statement:

```javascript
const { navigate } = this.props.navigation; 
// Using destructuring assignment
```

and then we can call the method like following:
```javascript
navigate(Profile, {userInfo: response}) 
```

where the first param is the screen to navigate to defined in the StackNavigator and the second one is the params to pass to the destination route.

In order to be able to access to the params passed along between the screens and some more information we do it using the this.props.navigation.state. Most commonly done using the destructuring assignment as follows:

```javascript
const {state} = this.props.navigation;
```
where we could have access to the params like state.params.userInfo.

This is different when we pass data between components embedded into other components, for that matter we use the props from the state of the component. An example is what we have done with our Badge component that is added to more than one screen (or component). In that case, to be able to pass information to it we added as a param in the component.

```javascript
<Badge userInfo={state.params.userInfo} />
```

Then, in the Badge.js component what we do is just retrieve that information from props in the constructor of the component (like initialization of it) and assigned it to the state of the component so it can be used globally. This is similar as creating a instance of the Badge component and passing the args you want to initialize that instance with.

```javascript
this.state = {
  userInfo: this.props.userInfo,
};
```

#### Web View
WebView react native component allows you to display web content of a specific uri passed as param in a native view. This has been used to be able to navigate to specific repository to view more information about it. This component has been used in a new screen added to the StackNavigator as Web_View.

When navigating from one screen to another, we might need to pass parameters to be used in the destination screen. These parameters might be part of the screen state so to be able to initialize that state and grab the value from props in the constructor of the new component, for example, if one of the parameters is notes, it can be accessed like  props.navigation.state.params.notes , so like this, it can be set in the component state.

```
class Notes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      notes: props.navigation.state.params.notes
    }
  }
  ```
