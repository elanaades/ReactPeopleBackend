using Microsoft.EntityFrameworkCore;

namespace ReactPeopleBackend.Data
{
    public class PersonRepository
    {
        private string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM people WHERE Id = {person.Id}");
            context.SaveChanges();
        }

        public void DeleteAll(PeopleForDelete ids)
        {
            using var context = new PeopleDbContext(_connectionString);
            var peopleToDelete = context.People.Where(p => ids.Ids.Contains(p.Id));
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            var personToUpdate = context.People.FirstOrDefault(p => p.Id == person.Id);
            if (personToUpdate != null)
            {
                context.Entry(personToUpdate).CurrentValues.SetValues(person);
            }
            context.SaveChanges();
        }
    }
}