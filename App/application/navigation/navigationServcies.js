export const _gotoHomeNavigator = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'homenavigator' }]
    })
}

export const _gotoOnBoardScreen = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'onBoard' }]
    })
}

export const _gotoAuthStack = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'auth' }]
    })
}