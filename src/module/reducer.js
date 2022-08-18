const initialState = {
  EditToggle: false,
  deleteIndex: [],
  conIndex: [],
  addIndex: [],
  cardNum: [],
};

const EditToggle = "EditToggle";
const CardToggle = "CardToggle";
const ToggleIndex = "toggleIndex";
const RemoveIndex = "removeIndex";

const CARDNUM = "CARDNUM";
const RemoveNUM = "removeNum";

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

export const eachAction = (data) => ({
  type: CARDNUM,
  data,
});

export const RemoveEach = (data) => ({
  type: RemoveNUM,
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

    case CARDNUM:
      return {
        ...state,
        cardNum: [...state.cardNum, action.data],
      };

    case RemoveNUM:
      return {
        ...state,
        cardNum: [...state.cardNum].filter((taget) => taget !== action.data),
      };

    default:
      return state;
  }
}
