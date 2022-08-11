const initialState = {
  EditToggle: false,
  titleIndex: [],
  conIndex: [],
  addIndex: [],
};

const EditToggle = "EditToggle";
const CardToggle = "CardToggle";
const ToggleIndex = "toggleIndex";
const RemoveIndex = "removeIndex";

export const EditAction = () => ({
  type: EditToggle,
});

export const CardAction = () => ({
  type: CardToggle,
});

export const IndexAction = (data) => ({
  type: ToggleIndex,
  data,
});

export const RemoveAction = (data) => ({
  type: RemoveIndex,
  data,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EditToggle:
      return {
        ...state,
        EditToggle: !state.EditToggle,
      };

    case ToggleIndex:
      return {
        ...state,
        [action.data.typeName]: [
          ...state[action.data.typeName],
          action.data.target,
        ],
      };

    case RemoveIndex:
      return {
        ...state,
        [action.data.typeName]: [...state[action.data.typeName]].filter(
          (taget) => taget !== action.data.target
        ),
      };

    default:
      return state;
  }
}
