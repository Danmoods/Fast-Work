export default function JobCard({

    title,
    description,
    salary,
    location,
    children

}){

    return(

        <div className="job-card">

            <h3>{title}</h3>

            <p>{description}</p>

            <p><strong>Salary:</strong> KES {salary}</p>

            <p><strong>Location:</strong> {location}</p>

            {children}

        </div>

    );

}