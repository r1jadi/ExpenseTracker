using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class PlayerDto
    {
        public int PlayerID { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public int BirthYear { get; set; }
        public int TeamID { get; set; }
        public Team Team { get; set; }
    }
}
