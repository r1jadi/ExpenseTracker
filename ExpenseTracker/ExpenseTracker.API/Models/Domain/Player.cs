namespace ExpenseTracker.API.Models.Domain
{
    public class Player
    {

        public int PlayerId { get; set; }

        public string Name { get; set; }
        public string Number { get; set; }
        public int BirthYear { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}
