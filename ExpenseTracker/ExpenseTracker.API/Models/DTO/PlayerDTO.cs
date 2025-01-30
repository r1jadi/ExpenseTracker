using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class PlayerDTO
    {
        public int PlayerId { get; set; }

        public string Name { get; set; }
        public string Number { get; set; }
        public int BirthYear { get; set; }
        public int TeamId { get; set; }

        public Team Team { get; set; }
    }
}
