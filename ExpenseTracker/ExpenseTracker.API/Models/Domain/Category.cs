namespace ExpenseTracker.API.Models.Domain
{
    public class Category
    {
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        //relationships

        public ICollection<Expense> Expenses { get; set; }
        public ICollection<Budget> Budgets { get; set; }

    }
}
