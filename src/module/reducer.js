const initialState = {
  EditToggle: false,
  CardToggle: false,
  cardNum: "",
};

const EditToggle = "EditToggle";
const CardToggle = "CardToggle";

export const EditAction = () => ({
  type: EditToggle,
});

export const CardAction = () => ({
  type: CardToggle,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EditToggle:
      return {
        ...state,
        EditToggle: !state.EditToggle,
      };
    case CardToggle:
      return {
        ...state,
        CardToggle: !state.CardToggle,
      };

    default:
      return state;
  }
}
