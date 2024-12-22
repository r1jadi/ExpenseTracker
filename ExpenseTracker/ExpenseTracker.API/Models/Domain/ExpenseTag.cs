namespace ExpenseTracker.API.Models.Domain
{
    public class ExpenseTag
    {
        public int ExpenseID { get; set; }
        public int TagID { get; set; }

        // rel
        public Expense Expense { get; set; }
        public Tag Tag { get; set; }
    }
}
