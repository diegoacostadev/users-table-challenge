const TABLE_HEAD = {
  avatar: {
    title: "Avatar",
    label: "avatar",
    filter: false,
  },
  name: {
    title: "Name",
    label: "first",
    filter: true,
  },
  lastName: {
    title: "Lastname",
    label: "last",
    filter: true,
  },
  country: {
    title: "Country",
    label: "country",
    filter: true,
  },
  actions: {
    title: "Actions",
    label: "actions",
    filter: false,
  },
} as const;

type UserTableType = {
  users: Result[] | undefined;
  showColoredRows: boolean;
  onDelete: ({id}: {id: string | null}) => void;
  changeSort: (key: SortValue) => void;
};

const cellStyles = {
  textAlign: "center",
} as const;

export default function UserTable({users, showColoredRows, onDelete, changeSort}: UserTableType) {
  const handleSort = (k: SortValue) => {
    changeSort(k);
  };

  return (
    <table
      className={showColoredRows ? "table-stripped" : ""}
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <thead>
        <tr>
          {Object.entries(TABLE_HEAD).map(([key, value]) => (
            <th
              key={key}
              style={{textAlign: "center"}}
              onClick={() => (value.filter ? handleSort(value.label) : () => {})}
            >
              {value.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id.value + user.cell}>
            <td style={cellStyles}>
              <img alt={user.name.first} src={user.picture.thumbnail} />
            </td>
            <td style={cellStyles}>{user.name.first}</td>
            <td style={cellStyles}>{user.name.last}</td>
            <td style={cellStyles}>{user.location.country}</td>
            <td style={cellStyles} onClick={() => onDelete({id: user.id.value})}>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
