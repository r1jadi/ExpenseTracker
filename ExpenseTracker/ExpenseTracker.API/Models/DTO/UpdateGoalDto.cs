namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateGoalDto
    {
        public string UserID { get; set; }
        public decimal TargetAmount { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
