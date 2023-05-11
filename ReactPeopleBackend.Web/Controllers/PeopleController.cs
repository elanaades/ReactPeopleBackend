using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleBackend.Data;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAllPeople();
        }

        [HttpPost]
        [Route("add")]
        public void AddPerson(Person person)
        {
            //Thread.Sleep(2000);
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("update")]
        public void UpdatePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.UpdatePerson(person);
        }

        [HttpPost]
        [Route("delete")]
        public void DeletePerson(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(person);
        }

        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(PeopleForDelete ids)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll(ids);
        }
    }
}
