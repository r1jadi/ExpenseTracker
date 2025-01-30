using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class TeamDTO
    {
        public int TeamId { get; set; }
        public string Name { get; set; }

        public ICollection<Player> Players { get; set; }
    }
}
