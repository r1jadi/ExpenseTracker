using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class TeamDto
    {
        public int TeamID { get; set; }
        public string Name { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
