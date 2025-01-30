namespace ExpenseTracker.API.Models.Domain
{
    public class Team
    {

        public int TeamId { get; set; }
        public string Name { get; set; }

        public ICollection<Player> Players { get; set; } 

    }
}
