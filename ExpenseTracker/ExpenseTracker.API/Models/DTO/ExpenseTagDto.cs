using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class ExpenseTagDto
    {
        public int ExpenseID { get; set; }
        public int TagID { get; set; }

        // rel
        public Expense Expense { get; set; }
        public Tag Tag { get; set; }
    }
}
