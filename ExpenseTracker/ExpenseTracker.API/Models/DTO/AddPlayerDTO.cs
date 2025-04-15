using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class AddPlayerDto
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int BirthYear { get; set; }
        public int TeamID { get; set; }
    }
}
