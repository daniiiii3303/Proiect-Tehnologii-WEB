const DeleteButton = (props) => {
  const { setShowModal } = props;

  return (
    <button
      type="button"
      className="text-white mt-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={() => setShowModal(true)}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
