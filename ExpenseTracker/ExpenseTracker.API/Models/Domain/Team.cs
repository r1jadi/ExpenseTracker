namespace ExpenseTracker.API.Models.Domain
{
    public class Team
    {
        public int TeamID { get; set; }
        public string Name { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
