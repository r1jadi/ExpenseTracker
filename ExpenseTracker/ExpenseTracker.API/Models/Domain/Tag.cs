namespace ExpenseTracker.API.Models.Domain
{
    public class Tag
    {
        public int TagID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        //many-to-many

        public ICollection<ExpenseTag> ExpenseTags { get; set; }
    }
}
