namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateGoalDto
    {
        public int UserID { get; set; }
        public decimal TargetAmount { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
