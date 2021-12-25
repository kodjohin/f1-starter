export const AppReducer = (state, action) => {
	switch (action.type) {
		case "START":
			return {
                ...state,
                started: action.payload
            };
		case "STOP":
			return {
                ...state,
                running: action.payload
            };
		default:
			return state
	}
};
