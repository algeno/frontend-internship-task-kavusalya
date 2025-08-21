import { useState } from "react";
import usersData from "./data/users.json";
import UserCard from "./components/UserCard";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Filter users based on the search query
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Profiles</h1>

      <div className="flex justify-center gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm w-full hover:bg-gray-100 bg-gray-50"
        />
        <Button
          variant="outline"
          onClick={() => {
            setQuery("");
            setCurrentPage(1);
          }}
          className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
        >
          Clear
        </Button>
      </div>

      {currentCards.length > 0 ? (
        <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentCards.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">No users found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={"cursor-pointer"}
          >
            Previous
          </Button>
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => handlePageChange(number)}
              className={
                currentPage === number
                  ? "bg-amber-200 hover:bg-amber-400 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              {number}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={"cursor-pointer"}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
